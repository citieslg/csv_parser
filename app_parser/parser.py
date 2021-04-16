import requests
from bs4 import BeautifulSoup
from datetime import datetime
from xml.etree.ElementTree import Element, ElementTree, SubElement, tostring
from keys import SITE
# I have to hide the link
URL = SITE


############################################
# methods which create XML
############################################
def get_responce(url):
	try:
		return requests.get(url)
	except:
		print('get_responce Error')
		return None


def pars_teams(ul_list, xml_element):
	# vars for xml tag league attrib: totalmaches, finished, now, soon
	match_now = 0
	match_finished = 0
	mathch_soon = 0
	list_teames = ul_list.find_all('li')
	for match in list_teames:
		# XML
		event_xml = SubElement(xml_element, 'event')

		# parse HTML
		match_status = match.find('span', class_='match-end') # завершен, перенесен
		# try to find live match class
		time_tag = match.find('span', class_='time time-live')

		isnow = True
		# checked is match now, and we try the tag time with class==time
		if time_tag == None:
			isnow = False

			# if match status has some text its can be завершен, перенесен == event finished for today
			if len(match_status.text) > 0:
				match_finished+=1
			else:
				mathch_soon+=1

			# parse HTML
			time_tag = match.find('span', class_='time')

		status = match_status.text if len(match_status.text) > 0 else \
				'live' if isnow else'soon'
		# XML
		time_xml = SubElement(
			event_xml,
			'time',
			attrib={
				'now': str(isnow),
				'status': status
				}
		)
		time_xml.text = time_tag.text

		# parse HTML
		team_home = match.find('span', class_='team-name-span')
		team_guest = team_home.find_next('span', class_='team-name-span')

		# XML
		team_home_xml = SubElement(event_xml, 'team_home')
		team_home_xml.text = team_home.text
		team_guest_xml = SubElement(event_xml, 'team_guest')
		team_guest_xml.text = team_guest.text

		# parse HTML
		# if match is now we can add scores
		score_soup = match.find('span', class_='score-con')
		if isnow:
			match_now += 1
			score_team_home, score_team_guest = \
			score_soup.get_text().split()[0].split('-')
		elif status == 'завершен':
			try:
				score_team_home, _n, score_team_guest = \
				score_soup.get_text().split()[:3]
			except ValueError as err:
				score_team_home, score_team_guest = \
				score_soup.get_text().split()[0].split('-')

		# XML
		if isnow or status == 'завершен':
			score_team_guest_xml = SubElement(event_xml, 'score', attrib={'side': 'team_home'})
			score_team_guest_xml.text = str(score_team_home)
			score_team_guest_xml = SubElement(event_xml, 'score', attrib={'side': 'team_guest'})
			score_team_guest_xml.text = str(score_team_guest)
		event_xml.attrib = {'name': f'{team_home.text}--{team_guest.text}'}
	return match_now, match_finished, mathch_soon


def create_xml(request):
# <?xml version="1.0" encoding="UTF-8"?>
# <soccer_today date:12.12.12 12:12>
# <schema_info>
	# <user id=1>Name</user>
	# <schema id_=1 name=name, separator=',', str='"'></schema>
	# <url>url,django</url>
# </schema_info>
	# <league name=Cup Europe, totalmaches=1, finished=1, now=1, soon=1>
		# <event name=team1+team2>
			# <time now=True >12</time>
			# <time now=False status=soon>12:30</time>
			# <team_home>Team1</team_home>
			# <team_guest>Team1</team_home>
			# <score side='team_home'>0</score>
			# <score side='team_guest'>0</score>
		# </event>
	# </league>
# </soccer_today>

	# parse HTML
	soup = BeautifulSoup(request.text,'html.parser')

	#XML
	header = '<?xml version="1.0" encoding="utf-8"?>'
	time_ = datetime.now().strftime('%Y-%m-%d %H:%M')
	soccer_today_xml = Element('soccer_today', attrib={'date':time_})
	tree = ElementTree(soccer_today_xml)
	schema_info_xml = SubElement(soccer_today_xml, 'schema_info')
	user_xml = SubElement(schema_info_xml, 'user', attrib={'id': 'db_user_id'})
	user_xml.text = "db_USERNAME"
	schema_xml = SubElement(schema_info_xml, 
		'schema', 
		attrib={
			'id':'1', 
			'name':'some_name', 
			'separator':'type', 
			'str':'type'
			}
	)
	url_xml = SubElement(schema_info_xml, 'url')
	url_xml.text = 'get_absolute_url'

	# parser HTML
	div_wraper = soup.find('div', class_='MC-match-top')
	div_wraper_ligue_name = div_wraper.find('div', class_='MC-match-top-left-name')
	while div_wraper != None:
		wraper_text = div_wraper_ligue_name.get_text()
		text_ligue = ' '.join(wraper_text.split())

		# XML
		league_xml = SubElement(soccer_today_xml, 'league')
		name_ligue_xml = SubElement(league_xml, 'name')
		name_ligue_xml.text = text_ligue
		# if no data in div_wraper the loop stop
		is_next_sibling = True
		next_sibling_wraper = div_wraper
		while is_next_sibling:
			next_sibling_wraper = next_sibling_wraper.next_sibling
			if next_sibling_wraper == '\n':
				pass
			else:
				match_now, match_finished, mathch_soon = \
				pars_teams(next_sibling_wraper, league_xml)
				is_next_sibling = False

		# XML
		league_xml.attrib = {
			'totalmaches': str(match_now + match_finished + mathch_soon), 
			'finished': str(match_finished), 
			'now': str(match_now), 
			"soon": str(mathch_soon)
		}

		# parse HTML
		div_wraper = div_wraper.find_next('div', class_='MC-match-top')
		if div_wraper != None:
			div_wraper_ligue_name = div_wraper.find('div', class_='MC-match-top-left-name')
	data = tostring(tree.getroot(), encoding="unicode", method="xml")
	with open('test.xml', "w") as f:
		f.write(header+data)
################################################
# end function for xml creation
################################################


################################################
# class for pars info from xml
################################################
class XmlFilter():
	pass


if __name__ == '__main__':
	data = get_responce(URL)
	create_xml(data)
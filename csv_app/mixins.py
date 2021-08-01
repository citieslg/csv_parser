class JSONMixin:
    name = None
    filter_val = None
    value_one = False
    value_two = False
    iscompair = False

    def get_json(self):
        body = {"name":self.name, "filter_val": self.filter_val}
        if self.value_one:
            body["value_one"] = self.value_one
        if self.value_two:
            body["value_two"] = self.value_two
        if self.iscompair:
            body["iscompair"] = self.iscompair
        return body
#coding=utf-8

import os
import xlrd
import json

xlsx_path = "./xlsx"
json_path = "./json"

def convert(xlsx_file_name, sheet):
    json_file = os.path.join(json_path, "%s-%s.json"%(xlsx_file_name[:-5], sheet.name))
    nrows = sheet.nrows
    return_data = []

    print(json_file)
    key_row = sheet.row_values(0)
    for i in range(nrows):
        cell = sheet.row_values(i)
        if i == 0 or i == 1:
            continue
        
        item = {}
        for j in xrange(0, sheet.ncols):
            row = sheet.row_values(i)
            cell = row[j]
            if  key_row[j].startswith("description"):
                continue
            item[key_row[j]] = cell
        return_data.append(item)
    return_json = json.dumps(return_data,encoding='UTF-8')
    open(json_file, "w").write(return_json)


def start():
    for item in os.listdir(xlsx_path):
        print(item)
        if not item.endswith(".xlsx"):
            continue
        if item.startswith("~$"):
            continue
        xlsx_file = os.path.join(xlsx_path, item)
        data = xlrd.open_workbook(xlsx_file)
        for sheet in data.sheets():
            convert(item, sheet)

    


if __name__ == "__main__":
    start()
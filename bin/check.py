#coding=utf-8

"""
检查配置的有效性
策划在提交配置的时候，可以先运行一下这个程序，保证配置的有效
by  reedhong 2020.03.26
"""

import os,sys
import xlrd
import json

xlsx_config_dir  = "../xlsx"


def get_reward_types(sheet):
    types = {}
    for i in range(sheet.nrows):
        cell = sheet.row_values(i)
        if i == 0 or i == 1:
            continue
        
        item = {}
        reward_type = int(sheet.row_values(i)[0])
        types[reward_type] = True
    return types

def get_rewards(sheet, reward_types):
    nrows = sheet.nrows
    ##key_row = sheet.row_values(0)
    rewards = {}
    for i in range(nrows):
        cell = sheet.row_values(i)
        if i == 0 or i == 1:
            continue
        
    
        row = sheet.row_values(i)
        reward_id  = row[0]
        if reward_id == "":
            continue
        random_type = row[1]
        reward_value = row[2]
        try:
            reward_obj = json.loads(reward_value)
        except ValueError as ve:
            print(u"reward_id：【%s】 配置出错"%reward_id)
            print(ve)
            return 

        #print(reward_id, random_type, reward_value)
        rewards[reward_id] = {
            "reward_items":reward_obj,
            "type":random_type
        }
        #print(reward_id)

    # check 配置
    for (key, value) in rewards.items():
        #print(key ,value)
        random_type = value["type"]
        reward_items = value["reward_items"]
  
        for reward in reward_items:
            reward_type = reward["type"]
            if reward_type not in reward_types:
                print(u"reward_id：【%s】 类型出错"%key)
                print(value)
                return 

            if reward_type == 4:
                reward_id = reward["id"]
                if reward_id not in rewards:
                    print(u"当前的reward_id %s,嵌套的：【%s】不存在"%(key, reward_id))
                    return          

    return rewards


def check_reward():
    xlsx_file = os.path.join(xlsx_config_dir, "reward.xlsx")
    data = xlrd.open_workbook(xlsx_file)
    sheet_reward = data.sheets()[0]
    sheet_reward_type = data.sheets()[1]
    types = get_reward_types(sheet_reward_type)
    get_rewards(sheet_reward, types)


def start():
    print("""检查奖励表，检查项包括：
1. 是否有错误的类型id
2. 奖励是否是合法的json串
3. 检查嵌套的奖励是否存在
    """)
    check_reward()


if __name__ == "__main__":
    print("开始检查配置文件的有效性")
    start()
    inputstr = input("输入exit,退出程序:\n")
    if inputstr == "exit":
        sys.exit(0)
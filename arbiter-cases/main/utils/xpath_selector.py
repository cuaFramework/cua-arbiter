# -*- coding: utf-8 -*-
"""
    xpath选择器，从html格式的字符串中按照xpath规格提取元素
"""

from lxml import etree


def select_xpath(xpath, html):
    """ 从html中提去元素"""
    return etree.HTML(html).xpath(xpath)


if __name__ == '__main__':
    text = """
    <div id="content">   
   <ul id="useful">
      <li>有效信息1</li>
      <li>有效信息2</li>
      <li>有效信息3</li>
   </ul>
   <ul id="useless">
      <li>无效信息1</li>
      <li>无效信息2</li>
      <li>无效信息3</li>
   </ul>
</div>
<div id="url">
   <a href="http://cighao.com">XX的博客</a>
   <a href="http://cighao.com.photo" title="XX的相册">点我打开</a>
</div>
    """

    print(select_xpath('//ul[@id="useful"]/li/text()', text))
    print(select_xpath('//a/@href', text))
    print(select_xpath('//a/@title', text))


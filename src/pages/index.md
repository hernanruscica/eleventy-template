---
title: Page list
layout: "base.njk"
---

Here you can see a list of the current pages

{% for page in collections.pages %}
- [{{ page.data.title }}]({{ site.baseUrl }}{{ page.url }})
{% endfor %}
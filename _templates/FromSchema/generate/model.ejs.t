---
to: src/models/<%= Name %>.ts
force: true
---

import { Model } from '@vuex-orm/core'
<%- h.vuexRelationImports(relationships) -%>

export default class <%= Name %> extends Model {
  static entity = '<%= h.inflection.pluralize(name) %>'

  static fields() {
    return {
<% for (const [fieldName, value] of Object.entries(fields)) { -%>
      <%= fieldName %>: <%= h.vuexAttribute(value)%>,
<%}-%>
<% for (const [fieldName, value] of Object.entries(relationships)) { -%>
      <%- h.vuexRelationAttribute([fieldName, value], name) %>,
<%}-%>
    }
  }

<% for (const [fieldName, value] of Object.entries(fields)) { -%>
  <%= fieldName %>!: <%= h.dataTypes(value.type) %>
<%}-%>
<% for (const [fieldName, value] of Object.entries(relationships)) {-%>
  <%- h.vuexRelationProperty([fieldName, value]) %>
<%}-%>
}

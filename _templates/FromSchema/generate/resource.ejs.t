---
to: src/resources/<%= Name %>Resource.ts
force: true
---

import { Model as OrionModel } from '@tailflow/laravel-orion/lib/model'

<%- h.orionRelationImports(relationships) -%>

export default class <%= Name %>Resource extends OrionModel<
  {
<% for (const [fieldName, value] of Object.entries(fields)) {-%>
    <%= fieldName %>: <%= h.dataTypes(value.type) %>
<% } -%>
  },
  Record<string, never>,
  {
<% for (const [fieldName, value] of Object.entries(relationships)) {-%>
    <%- h.orionRelationProperty([fieldName, value]) %>
<%}-%>
  }
> {
  public $resource(): string {
    return '<%= h.inflection.pluralize(name) -%>'
  }

<% for (const [fieldName, value] of Object.entries(relationships)) {-%>
  public <%=fieldName%>(): <%= h.capitalize(value.relation) %><<%= value.model %>> {
    return new <%= h.capitalize(value.relation) %>(<%= h.inflection.singularize(value.model) %>, this)
  }
<%}-%>
}

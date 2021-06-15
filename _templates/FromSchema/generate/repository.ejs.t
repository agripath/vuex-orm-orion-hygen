---
to: src/repositories/<%= Name %>Repository.ts
force: true
---

import { OrionRepository } from '@patcarter883/vuex-orm-orion-next'
import <%= Name %> from 'src/models/<%= Name %>'
import <%= Name %>Resource from 'src/resources/<%= Name %>Resource'

export default class <%= Name %>Repository extends OrionRepository<<%= Name %>> {
  use = <%= Name %>
  orionModel = <%= Name %>Resource
}

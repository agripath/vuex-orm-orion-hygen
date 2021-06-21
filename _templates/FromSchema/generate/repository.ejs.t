---
to: src/repositories/<%= Name %>Repository.ts
force: true
---

import { Repository } from '@vuex-orm/core'
import <%= Name %> from 'src/models/<%= Name %>'

export default class <%= Name %>Repository extends Repository<<%= Name %>> {
  use = <%= Name %>
}

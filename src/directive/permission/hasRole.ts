 /**
 * v-hasRole 角色权限处理
 * Copyright (c) 2019 ruoyi
 */
 
import {useStore} from 'vuex'
import type { Directive, DirectiveBinding } from 'vue'

 const directives :Directive=  {
  mounted(el, binding:DirectiveBinding) {
    const { value } = binding
    const super_admin = "admin";
    const roles = useStore().state.user.info.roles

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some(role => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值`)
    }
  }
}
export default directives
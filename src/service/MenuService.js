import axios from 'axios'
import history from '../utils/history'
import Service from './Service'
import { API_URL } from '../utils/config'

export class MenuService {
    
    getMenuItem() {
        let apiObject = new FormData()
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/get-menu`, apiObject)
                .then(res => {
                    return {
                        menu: this.generateMenuItem(res.data.menu)
                    }
                })
    }

    generateMenuItem(menuItems) {
        if(!menuItems) return
        let menus = []
        for (var i = 0; i < menuItems.length; i++) {
            let menuItem = (typeof menuItems[i] === 'object') ? menuItems[i] : JSON.parse(menuItems[i])
            let url = menuItem.url ?  (menuItem.url.startsWith('/')) ? '/admin' + menuItem.url : '/admin/' + menuItem.url  : null
            menus.push({
                icon: menuItem.icn,
                label: menuItem.lbl,
                items: this.generateMenuItem(menuItem.itm),
                command: () => { 
                    if(url) {
                        history.push(url) 
                    }
                }
            })
        }
        return menus
    }

}
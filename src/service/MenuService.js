import axios from 'axios';
import history from '../utils/history'
import { menuParser } from '../utils/parser'
import { API_URL } from '../utils/config'

export class MenuService {
    
    getMenuItem() {
        return axios.get(`${API_URL}/menubar`)
                .then(res => {
                    return this.generateMenuItem(menuParser(res.data))
                });
    }

    generateMenuItem(menuItems) {
        if(!menuItems) return;
        let menus = [];
        for (var i = 0; i < menuItems.length; i++) {
            let menuItem = (typeof menuItems[i] === 'object') ? menuItems[i] : JSON.parse(menuItems[i])
            let url = menuItem.url ?  (menuItem.url.startsWith('/')) ? menuItem.url : '/' + menuItem.url  : null
            menus.push({
                icon: menuItem.icon,
                label: menuItem.label,
                items: this.generateMenuItem(menuItem.items),
                command: () => { 
                    if(url) {
                        history.push(url) 
                    }
                }
            })
        }
        return menus;
    }

}
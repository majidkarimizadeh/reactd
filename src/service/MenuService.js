import axios from 'axios';
import history from '../history'
import { menuParser } from '../parser/parser'
import { API_URL } from '../config'

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
        for (var i = menuItems.length - 1; i >= 0; i--) {
            let menuItem = (typeof menuItems[i] === 'object') ? menuItems[i] : JSON.parse(menuItems[i])
            let url = (menuItem.url && menuItem.url.startsWith('/')) ? '' + menuItem.url : '/' + menuItem.url
            menus.push({
                icon: menuItem.icon,
                label: menuItem.label,
                items: this.generateMenuItem(menuItem.items),
                command: () => { history.push(url) }
            })
        }
        return menus;
    }

}
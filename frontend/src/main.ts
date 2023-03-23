import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
/* Vue 2 and Vue 3 use the same icon importing syntax */

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* add some free styles */
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


/* add each imported icon to the library */
library.add(faTwitter,faHome,faFacebook,faUser,faSearch, faEnvelope, faChartPie, faBell )


createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router).mount('#app')

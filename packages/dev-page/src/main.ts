import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './routes';
import './style.css';
import './style.less';

const app = createApp(App);

app.use(Antd);
app.use(router);

app.mount('#root');

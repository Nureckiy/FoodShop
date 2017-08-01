import {createHashHistory} from 'history';
import {useRouterHistory} from 'react-router';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default appHistory;

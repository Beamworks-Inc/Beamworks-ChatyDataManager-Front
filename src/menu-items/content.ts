// assets
import { LoginOutlined, ProfileOutlined, PlusCircleOutlined } from '@ant-design/icons';

// icons
const icons = {
    PlusCircleOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const content = {
    id: 'content',
    title: 'Content',
    type: 'group',
    children: [
        {
            id: 'content',
            title: 'Content',
            type: 'item',
            url: '/content',
            icon: icons.PlusCircleOutlined,
            target: false
        }
    ]
};

export default content;

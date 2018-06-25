import React from 'react';
import AddClientForm from './AddClientForm';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmClientDelete from './ConfirmClientDelete';
import EditClientForm from './EditClientForm';



import requiresLogin from './requires-login';

export class ClientsList extends React.Component {

    render() {

        const sortFunction = (a, b) => {
            if (a.name < b.name) {
                return -1;
            } if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        const sortedClientList = this.props.filteredList.sort(sortFunction);

        const clientList = sortedClientList.map((client) => {
            return (
                <div key={client.id} className="client">
                 <ul className="client__list" key={client.id}>
                        <li className="client__list__name">{client.name}</li>
                        <li className="client__list__phone">{client.phone}</li>
                        <li className="client__list__email">{client.email}</li>
                 </ul>
                <ConfirmClientDelete clientId={client.id} />
                 <EditClientForm clientInfo={client} clientId={client.id}/>
                    {/* <div className="client__name">{client.name}</div>
                    <div className="client__phone">{client.phone}</div> 
                    <div className="client__email">{client.email}</div> */}
                </div>
            )
         });
        
         
        return (
            <div className="client-list">
                <div className="add-client-button-flexbox">
                    <AddClientForm/>
                </div>
                <div className="client-list-div">
                {clientList}
                </div>
            </div>
        )
    }
}

export default requiresLogin()(connect()(ClientsList));

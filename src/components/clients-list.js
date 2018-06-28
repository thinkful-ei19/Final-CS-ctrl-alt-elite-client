import React from 'react';
import AddClientForm from './AddClientForm';
import {connect} from 'react-redux';
import ConfirmClientDelete from './ConfirmClientDelete';
import EditClientForm from './EditClientForm';



import requiresLogin from './requires-login';

export class ClientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'There are no clients that match your search'
        };
    }

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
                    <div className="client__list__options">
                        <EditClientForm clientInfo={client} clientId={client.id}/>
                        <ConfirmClientDelete clientId={client.id} />
                    </div>
                    {/* <div className="client__name">{client.name}</div>
                    <div className="client__phone">{client.phone}</div> 
                    <div className="client__email">{client.email}</div> */}
                </div>
            )
         });

        
        if (clientList.length === 0) {
            return (
                <div className="client-list">
                    <div className="client-list-div">
                        <div className="client-list-div-message">
                            {this.state.message}
                        </div>
                    </div>
                </div>
            )
        } else {
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
}

export default requiresLogin()(connect()(ClientsList));

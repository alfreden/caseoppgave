import React, { Component } from 'react';
import { render } from 'react-dom';

/*ServerDB Connections*/
const fetchServers = () => {
    const fetchUrl = "http://localhost:61951/api/server/list";

    return fetch(fetchUrl)
        .then((response) => { return response.json() });
};

const postServer = (name) => {
    const postUrl = `http://localhost:61951/api/server/create?name=${name}`
    let result = fetch(postUrl, { method: "POST" });
}

const deleteServer = (id) => {
    const postUrl = `http://localhost:61951/api/server/delete?id=${id}`
    let result = fetch(postUrl, { method: "DELETE" });
    console.log(id)
}

const updateServer = (id, name) => {
    const postUrl = `http://localhost:61951/api/server/update?id=${id}&name=${name}`
    let result = fetch(postUrl, { method: "PUT" });
}
/*End ServerDB Connections*/

/*ServiceDB Connections*/
const fetchServices = () => {
    const fetchUrl = "http://localhost:61951/api/service/list";

    return fetch(fetchUrl)
        .then((response) => { return response.json() });
};

const postService = (name) => {
    const postUrl = `http://localhost:61951/api/service/create?name=${name}`
    let result = fetch(postUrl, { method: "POST" });
}

const deleteService = (id) => {
    const postUrl = `http://localhost:61951/api/service/delete?id=${id}`
    let result = fetch(postUrl, { method: "DELETE" });
}

const updateService = (id, name) => {
    const postUrl = `http://localhost:61951/api/service/update?id=${id}&name=${name}`
    let result = fetch(postUrl, { method: "PUT" });
}
/*End ServiceDB Connections*/

const fetchServerServices = () => {
    const fetchUrl = `http://localhost:61951/api/serverservice/servicelist`;

    return fetch(fetchUrl)
        .then((response) => { return response.json() });
};

const createServerService = (serverId, serviceId) => {
    const postUrl = `http://localhost:61951/api/serverservice/create?serverId=${serverId}&serviceId=${serviceId}`
    fetch(postUrl, { method: "POST" });
}

const getServersServices = (serverId) => {
    const fetchUrl = `http://localhost:61951/api/serverservice/server?serverId=${serverId}`
        return fetch(fetchUrl)
        .then((response) => { return response.json() });
}




/** Main */
class App extends Component {

    constructor(props) {
        super(props);
        this.state = { servers: [], services: [], serverservice: [] }
    }

    componentDidMount() {

        let servicesPromise = fetchServices();

        servicesPromise.then((services) => {
            this.setState({ services: services });
        })

        let serversPromise = fetchServers();

        serversPromise.then((servers) => {
            this.setState({ servers: servers });
        })

    }

    render() {
        return (
            <div className="main">
                <div className="main-item">
                    <ServerGenerator />
                    <ServerList />

                </div>
                <div className="main-item">
                    <ServiceGenerator />
                    <ServiceList />
                </div>
                <div className="main-item">
                    <ServerServiceGenerator servers={this.state.servers} services={this.state.services} />
                    <ServerServiceList />
                </div>
            </div>
        );
    }
}
/** End Main */

class ServicesOnServer extends Component {
    constructor(props) {
        super(props);

        this.state = ({ service: [] })
    }
    componentWillMount() {

        let serverservicePromise = getServersServices(this.props.id);

        serverservicePromise.then((service) => {
            this.setState({ service: service });
        })
    }

    render() {
        return (
            <div>
                {this.state.service.length > 0 && this.state.service.map((services) =>
                    <p>service name: {services.service.id}</p>
                )}
            </div>
        )
    }
}

class ServerServiceList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            server: [], serverservice: []
        }
    }

    componentWillMount() {
        let serverPromise = fetchServers();

        serverPromise.then((server) => {
            this.setState({ server: server });
        })
        let serverservicePromise = getServersServices(1);

        serverservicePromise.then((service) => {
            this.setState({ service: service });
        })
    }



    render() {
        return (
            <ul className="list">
                {this.state.server.length > 0 && this.state.server.map((servers, index) =>
                    <li className="list-item" key={index} >
                        <div>
                            <p>Server name: {servers.name}</p>
                            <ServicesOnServer serverId={servers.id} />
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}

/*Server handling*/
class ServerGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = { serverName: "" };

        this.updateState = this.updateState.bind(this);

    }

    updateState(event) {
        const serverName = event.target.value;
        this.setState({ serverName })
    }

    render() {
        return (
            <form onSubmit={(e) => { postServer(this.state.serverName); e.preventDefault() }}>
                <label>Create new server</label>
                <input type="text" value={this.state.serverName} onChange={this.updateState} />
                <input type="submit" content="POST til server" />
            </form>
        );
    }
};

class ServerUpdater extends Component {
    constructor(props) {
        super(props);
        this.state = { serverName: "" };

        this.updateState = this.updateState.bind(this);

    }

    updateState(event) {
        const serverName = event.target.value;
        this.setState({ serverName })
    }

    render() {
        return (
            <form onSubmit={(e) => { updateServer(this.props.uId, this.state.serverName); e.preventDefault() }}>
                <input type="text" value={this.state.serverName} onChange={this.updateState} />
                <input type="submit" content="update db field" value="update" />
            </form>
        );
    }
};

class DeleteServer extends Component {

    constructor(props) {
        super(props);
        this.state = { dId: "" };
    }

    render() {
        return (
            <form onSubmit={(e) => { deleteServer(this.props.dId); e.preventDefault() }}>
                <input type="submit" value="delete" dId={this.props.id} />
            </form>
        )
    }
}

class ServerList extends Component {

    constructor(props) {
        super(props);
        this.state = { servers: [] };
    }

    componentDidMount() {
        let serversPromise = fetchServers();

        serversPromise.then((servers) => {
            console.log(servers);
            this.setState({ servers: servers });
        })
    }

    render() {
        return (
            <ul className="list">
                {this.state.servers.length > 0 && this.state.servers.map((server) =>
                    <li className="list-item" key={server.id} >

                        <div>
                            Server name: {server.name}
                            <DeleteServer dId={server.id} />
                        </div>
                        <div>
                            <ServerUpdater uId={server.id} />
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}
/**End server Handling */


/*Service handling*/
class ServiceList extends Component {

    constructor(props) {
        super(props);
        this.state = { services: [] };
    }

    componentDidMount() {
        let servicesPromise = fetchServices();

        servicesPromise.then((services) => {
            this.setState({ services: services });
        })
    }

    render() {
        return (
            <ul className="list">
                {this.state.services.length > 0 && this.state.services.map((services) =>
                    <li className="list-item" key={services.id} >
                        <div>
                            Service name: {services.name}
                            <DeleteService dId={services.id} />
                        </div>
                        <div>
                            <ServiceUpdater uId={services.id} />
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}

class ServiceUpdater extends Component {
    constructor(props) {
        super(props);
        this.state = { serviceName: "" };

        this.updateState = this.updateState.bind(this);

    }

    updateState(event) {
        const serviceName = event.target.value;
        this.setState({ serviceName })
    }

    render() {
        return (
            <form onSubmit={(e) => { updateService(this.props.uId, this.state.serviceName); e.preventDefault() }}>
                <input type="text" value={this.state.serviceName} onChange={this.updateState} />
                <input type="submit" content="update db field" value="update" />
            </form>
        );
    }
};

class ServiceGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = { serviceName: "" };

        this.updateState = this.updateState.bind(this);

    }

    updateState(event) {
        const serviceName = event.target.value;
        this.setState({ serviceName })
    }

    render() {
        return (
            <form onSubmit={(e) => { postService(this.state.serviceName); e.preventDefault() }}>
                <label>Create new service</label>
                <input type="text" value={this.state.serviceName} onChange={this.updateState} />
                <input type="submit" content="POST til service" />
            </form>
        );
    }
};

class DeleteService extends Component {

    constructor(props) {
        super(props);
        this.state = { dId: "" };
    }

    render() {
        return (
            <form onSubmit={(e) => { deleteService(this.props.dId); e.preventDefault() }}>
                <input type="submit" value="delete" dId={this.props.id} />
            </form>
        )
    }
}

class ServerServiceGenerator extends Component {
    constructor(props) {
        super(props);

        this.state = { service: "-1", server: "-1" };
        this.createService = this.createService.bind(this);
    }

    createService() {
        //Check if one of the two is in default state
        if (this.state.server == "-1" || this.state.service == "-1") {
            alert("Både server og service må velges i listen");
            return;
        }
        createServerService(this.state.server, this.state.service);
    }


    render() {
        const { servers, services } = this.props;



        return (
            <div className="main-item">
                <select onChange={(e) => this.setState({ server: e.target.value })}>
                    <option value="-1">Choose server</option>
                    {servers.map((server) =>
                        <option value={server.id} key={server.id}>{server.name} - {server.id}</option>
                    )}
                </select>

                <select onChange={(e) => this.setState({ service: e.target.value })}>
                    <option value="-1">Choose service</option>

                    {services.map((service) =>
                        <option value={service.id} key={service.id}>{service.name} - {service.id}</option>
                    )}
                </select>
                <button onClick={this.createService}>relater</button>
            </div>
        );

    }
}

/*End service handling*/


render(<App />, document.getElementById('root'));


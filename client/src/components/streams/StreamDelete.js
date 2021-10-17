import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
//import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    onSubmit = (id) => {
        console.log(id);
        this.props.deleteStream(this.props.match.params.id);
    };
    renderActions = () => {
        return (
            <React.Fragment>
                <button className="ui primary button " onClick={this.onSubmit}>Delete</button>
                <Link className="ui cancel button" to="/" >Cancel</Link>
            </React.Fragment>
        );
    };
    renderModal = () => {

    };

    render() {

        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Modal actions={this.renderActions}
                    content="Are you sure you want to delete?"
                    header={this.props.stream.title}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {

    return { stream: state.streams[ownProps.match.params.id], isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
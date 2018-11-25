import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


const LAUNCH_QUERY = gql`
  query launchQuery($flight_number: Int!) {
    launch(flight_number : $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local,
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;


export default class Launch extends Component {

  render() {
    // getting the flight number from route props.
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);

    return (
      <div>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {
            ({ loading, err, data }) => {
              if (loading) return <h1>loading...</h1>
              if (err) console.log(err);
              const {
                flight_number,
                mission_name,
                launch_year,
                launch_success,
                launch_date_local,
                rocket: {
                  rocket_id,
                  rocket_name,
                  rocket_type
                }
              } = data.launch;
              return (
                <div>
                  <h1 className="display-4 my-3">Mission Name: <span className="text-dark">{mission_name}</span></h1>
                  <h4 className="mb-3">Luanch Details</h4>
                  <ul className="list-group">
                    <li className="list-group-item">
                      Flight Number: {flight_number}
                    </li>
                    <li className="list-group-item">
                      Launch Year: {launch_year}
                    </li>
                    <li className="list-group-item">
                      Launch Success: <span className={classNames({
                        'text-success': launch_success,
                        'text-danger': !launch_success
                      })}>
                        {launch_success ? 'Yes' : 'No'}
                      </span>
                    </li>
                  </ul>
                  <h4 className="my-3">Rocket Details</h4>
                  <ul className="list-group">
                    <li className="list-group-item">
                      Rocket id: {rocket_id}
                    </li>
                    <li className="list-group-item">
                      Rocket Name: {rocket_name}
                    </li>
                    <li className="list-group-item">
                      Rocket Type: {rocket_type}
                    </li>
                  </ul>
                  <Link to="/" className="btn btn-secondary">Back</Link>
                </div>
              );
            }
          }
        </Query>
      </div>
    )
  }
}


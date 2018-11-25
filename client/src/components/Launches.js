import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import MissionStatus from "./MissionStatus";
const LAUNCHES_QUERY = gql`
  {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;
export default class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h3>Launches</h3>
        <MissionStatus />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h2>Loading...</h2>;
            if (error) console.log(`ERROR: ${error}`);
            console.log("data: ", data);

            return (
              <Fragment> 
                {data.launches.map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

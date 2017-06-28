import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelsListQuery } from './ChannelsListWithData';

const AddChannel = ({mutate}) => {
  const handleKeyup = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({
        variables: {
          name: evt.target.value
        },
        refetchQueries: [{
          query: channelsListQuery
        }],
      }).then( res => {
        evt.target.value = '';
      });
    }
  };

  return (
    <input
      type="text"
      placeholder="New Channel"
      onKeyUp={handleKeyup}
    />
  );
};

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`

const AddChannelWithMutation = graphql(
  addChannelMutation
)(AddChannel);

export default AddChannelWithMutation;
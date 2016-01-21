import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import _ from 'lodash'

const initialList = [
	'Introduction',
	'Inline Styles',
	'If-Else in JSX',
	'Self-Closing Tag',
	'Maximum Number of JSX Root Nodes',
	'Shorthand for Specifying Pixel Values in style props',
	'Type of the Children props',
	'Value of null for Controlled Input',
	'componentWillReceiveProps Not Triggered After Mounting',
	'Props in getInitialState Is an Anti-Pattern',
	'DOM Event Listeners in a Component',
	'False in JSX',
	'Load Initial Data via AJAX',
	'Communicate Between Components',
	'Expose Component Functions',
	'this.props.children undefined',
	'Use React with Other Libraries',
	'Dangerously Set innerHTML'
]

function filterListReducer (state = initialList, action) {
  switch (action.type) {
  case 'REMOVE':
    let nextState = _.clone(state) //create a duplicate so that react knows our state has changed
    _.remove(nextState, (item) => item === action.target)
    return nextState
  default:
    return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(filterListReducer)

class List extends React.Component {
	createListItem (item, i) {
		var handler = this.props.onClick.bind(null, item)
		return <li key={item} onClick={handler}>{item}</li>
	}

	render () {
		return <ul>{this.props.items.map(this.createListItem.bind(this))}</ul>
	}
}

class FilterList extends React.Component {
	constructor (props) {
		super (props)
    this.state = {filter: ''};
  }

  handleChange (event) {
    this.setState({filter: event.target.value});
  }

  getFilteredItems (filter) {
  	filter = filter.toLowerCase()
  	if(!this.props.items){
  		return [];
  	}
  	return this.props.items.filter((item) => {
  		item = item.toLowerCase()
  		return item.indexOf(filter) > -1
  	})
  }

  render () {
    var filter = this.state.filter;
    return (
    	<div>
	    	<input type="text" value={filter} onChange={this.handleChange.bind(this)} />
	    	<List items={this.getFilteredItems(filter)} onClick={this.props.onClick} />
    	</div>
    )
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    items: state
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onClick: (target) => dispatch({type: 'REMOVE', target})
  }
}

const ConnectedFilterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList)

ReactDOM.render(
	<Provider store={store}>
    <ConnectedFilterList/>
  </Provider>,
	document.getElementById('mount')
);
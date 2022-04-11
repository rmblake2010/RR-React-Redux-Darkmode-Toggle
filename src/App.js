import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { customId, incrementId, decrementId, reset, fetchData } from './features/dataSlice'
import { useEffect } from 'react';

const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})



function App(props) {
  // your logic goes here!
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

  const renderImage = () => {
    return(
      <img src={data.apiData.primaryImageSmall} alt={data.apiData.title} />
    )
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => {dispatch(fetchData())}}>Trigger Thunk</button>
        <button onClick={() => {dispatch(reset())}}>Clear</button>
        <button onClick={() => {dispatch(incrementId())}}>Next</button>
        <button onClick={() => {dispatch(decrementId())}}>Back</button>
      </div>
      <input value={data.objectId} onChange={(e) => {
        console.log(e.target.value)
        dispatch(customId(Number(e.target.value)))
      }} />
      <div>
        {renderImage()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App)

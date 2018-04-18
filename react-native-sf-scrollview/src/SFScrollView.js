/**
 * Created by Joker on 2018-04-17.
 */
import React,{Component} from 'react'
import {View,RefreshControl, ScrollView} from 'react-native'
import PropTypes from 'prop-types'
const defaultColor = "#00AEF3"

export default class SFScrollView extends Component{
    static propTypes = {
        onLoadData:PropTypes.func,
        onRefresh:PropTypes.func,
        children:PropTypes.node.isRequired,
        style: View.propTypes.style,
        indicator_color:PropTypes.string,
        canRefresh:PropTypes.bool
    }
    static defaultProps={
        indicator_color:defaultColor,
        canRefresh:true
    }
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing:false,
            isLoading:false,
            canRefresh:true
        }
    }
    componentWillMount(){
        this.setState({
            canRefresh:this.props.canRefresh
        })
    }

    render() {
        const props = this.props
        const state = this.state
        return (
            <ScrollView style={[this.props.style]} onMomentumScrollEnd = {this._contentViewScroll} refreshControl={this.state.canRefresh?
                <RefreshControl
                    refreshing={state.isRefreshing}
                    onRefresh={this.onRefresh}
                    tintColor={props.indicator_color}
                    title="正在刷新数据..."
                    colors={[props.indicator_color]}
                    progressBackgroundColor="#ffffff"
                />:null
            } scrollEventThrottle={2}>{props.children}</ScrollView>
        );
    }
    _contentViewScroll=(e)=>{
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight-100 && !this.state.isLoading){
            this.state.isLoading = true
            if(this.props.onLoadData!=null && this.state.canRefresh){
                this.props.onLoadData()
            }
        }

    }

    setRefreshing=(visible)=>{
        this.setState({
            isRefreshing:visible
        })
    }
    setLoading=(loading)=>{
        this.state.isLoading = loading
    }
    canRefresh=(can)=>{
        this.setState({
            canRefresh:can
        })
    }
    onRefresh=()=>{
        this.setRefreshing(true)
        if(this.props.onRefresh!=null){
            this.props.onRefresh()
        }
    }

}
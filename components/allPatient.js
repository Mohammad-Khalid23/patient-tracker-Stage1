import React, { Component } from 'react'
import { Container, Content, TouchableHighlight , Header, Item, Title, Input, Icon, Button, Text, View, List, ListItem, Right, Left, Body } from 'native-base';
import { Alert } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import PatientMiddleware from "../store/middlewares/patientMiddleware.js"
import PatientInfo from './patientInfo.js'

function mapStateToProps(state) {
    console.log(state, "state value in all patient")
    return {
        patientDetail: state.allPatients
    }
    // console.log(ths.props.patientDetail, "sdfd")
}
function mapDispatchToProps(dispatch) {
    return {
        addPatient: function (value) {
            return dispatch(PatientMiddleware.asyncAddPatient(value))
        },
        deletePatient: function (value) {
            return dispatch(PatientMiddleware.asyncDeletePatient(value))
        },
        loadPatients: () => {
            return dispatch(PatientMiddleware.asyncLoadPatient())
        }

    }
}


class AllPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }
    componentWillMount() {
        this.props.loadPatients();

    }


    randomSearch = (obj) => {
        console.log(this.state.search)
        return obj.name.search(this.state.search) >= 0 || obj.name.search((this.state.search).toLowerCase) >= 0 || obj.date.search(this.state.search) >= 0;
    }
    delete(index) {
        // Alert.alert("delte button")
        this.props.delete(index)
        
    }
    detail(index) {
        Actions.patient_info({ value: (this.props.patientDetail[index]) , deleteIndex : (this.delete.bind(this,index)) });
    }


    render() {
        let myList;
        if (this.props.patientDetail) {
            myList = this.props.patientDetail.filter(this.randomSearch).map((data, index) => {
                return <ListItem key={index} >
                <Left>
                <Icon name="ios-people" />
                </Left>
                    <Body>
                        <Text >{data.name}</Text>
                    </Body>
                    <Right>

                        <Text style={{color:'blue'}} onPress={this.detail.bind(this, index)}>View</Text>
                    </Right>
                </ListItem>

            })
        }

        return (
            <View style={{ flex: 1 }}>
                <Container>
                    <Header>
                        <Left>
                        </Left>
                        <Body>
                            <Title>
                                Patient Tracker
                        </Title>
                        </Body>
                    </Header>
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search"
                                onChangeText={(search) => this.setState({ search })}

                            />
                            <Icon name="ios-people" />
                        </Item>
                        <Button transparent>
                            <Text >Search</Text>
                        </Button>
                        {/* <DatePicker onDateChange={(date) => { this.setState({ date: date }) }}

                            format="YYYY-MM-DD"
                            minDate="2017-08-29"
                        /> */}
                    </Header>
                    <Content scrollEnabled={false}>
                        <List>
                            {myList}
                        </List>
                    </Content>

                </Container>
                <Button onPress={() => Actions.add_patient()} primary block>
                    <Icon name="ios-people" />
                    <Text>Add Patient</Text>
                </Button>
            </View>

        )
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(AllPatient)

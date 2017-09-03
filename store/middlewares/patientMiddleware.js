import PatientActions from "../actions/patientActions.js"
import { AsyncStorage } from 'react-native'

export default class PatientMiddleware {
    static asyncAddPatient(patientData) {
        console.log(patientData, "mw")
        var myvalue = []
        return (dispatch) => {
            // AsyncStorage.clear();
            var data = AsyncStorage.getItem("patients").then(data => {
                if (data == null) {
                    // alert("if")
                    myvalue[0] = patientData;
                    AsyncStorage.setItem('patients', JSON.stringify(myvalue)),
                        () => {
                            AsyncStorage.getItem('patients', (err, result) => {
                                patients = JSON.parse(result)
                                dispatch(PatientActions.addPatient(patients))
                            });
                        }
                }
                else {
                    // alert("else")
                    data = JSON.parse(data);
                    data.push(patientData)
                    console.log(data, "mw else")
                    AsyncStorage.setItem("patients", JSON.stringify(data),
                        () => {
                            AsyncStorage.getItem('patients', (err, result) => {
                                patients = JSON.parse(result);
                                console.log(patients, "asyn value")
                                dispatch(PatientActions.addPatient(patients));
                            });
                        }
                    )

                }

            })
        }
    }

    static asyncLoadPatient() {
        return (dispatch) => {
            AsyncStorage.getItem('patients', (err, result) => {
                patients = JSON.parse(result);

                dispatch(PatientActions.addPatient(patients));
            });
        }
    }


    static asyncDeletePatient(data) {
        console.log(data, "middleware of del")
        return (dispatch) => {
            AsyncStorage.getItem("patients", (err, result) => {
                patients = JSON.parse(result);
                patients.splice(data, 1);
                AsyncStorage.setItem("patients", JSON.stringify(patients))
                dispatch(PatientActions.addPatient(patients))

            })

        }
    }

}
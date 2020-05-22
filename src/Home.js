import React, { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MultipleSelect from './Comp/MultipleSelect'
import LoadingDiv, { LoadedDiv } from './Comp/skelton'
import Cookies from 'universal-cookie';
import AlertDismissible from './Comp/Alert'
const cookies = new Cookies();


var header_array = ["Bearer Mi74R_XRPMAIL_COM_AUT:gOojdguRVl5VUsfSjnANuA==", "Bearer Ci72R_ETOYMAIL_COM_AUT:Hrzv6m07/r6YyBjYhL6vMw==", "Bearer Tb5k7_ETOYMAIL_COM_AUT:WdtRKsNDDUVGsCpAFqzLAQ==", "Bearer n5RZg_ETOYMAIL_COM_AUT:RHPArNAMatw41zNTfLjxpw==", "Bearer b5N6Z_ETOYMAIL_COM_AUT:KsbRaj0k0/5b0H/ix9skfA==", "Bearer d7ZBq_APRIMAIL_COM_AUT:MvF6nVh+T/m4J6ZFD5pevw==", "Bearer a7W4A_APRIMAIL_COM_AUT:GR/FcXf1WlG3HGT32SG2vA==", "Bearer y5D2Q_APRIMAIL_COM_AUT:mk+iQ7i6SMV2If+L9ie9GA==", "Bearer p9Y4J_ETOYMAIL_COM_AUT:f8Xu5EGVWLwJAzX/u+/1sQ==", "Bearer Dd4i8_CHORDMI_COM_AUT:EeWHFcC4c5kV6F3TQDdTkQ==", "Bearer q9LRi_CHORDMI_COM_AUT:4ruL6/xw/OmTkN44J1Ri2w==", "Bearer d2TYc_ETOYMAIL_COM_AUT:sHcvF98sNigYCEkde0amtQ==", "Bearer f6K9C_APRIMAIL_COM_AUT:T6r4PV0p8AZFSY0s959tQQ==", "Bearer Sp2r7_ETOYMAIL_COM_AUT:o+Rw9Jg8Gn9/0t4bKTPu1g=="]
var header_key = header_array[Math.floor(Math.random() * header_array.length)]
var myHeaders = new Headers();
myHeaders.append("Authorization", header_key);     //Production Header
// myHeaders.append("Authorization", "Bearer nolew96553@xrpmail.com:WNqhFdFBnIWDi8cJqlji9Q==");       //Development Header
// let login_url = "sandbox-authservice.priaid.ch";
let login_url = "authservice.priaid.ch";
// let main_url = "sandbox-healthservice.priaid.ch";
let main_url = "healthservice.priaid.ch"





export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: '',
            alert: false,
            fetched_issues: '',
            loading: false,
            loaded: false, alert_message: ''
        };
    }

    get_issue() {
        let symptom_id = cookies.get('symptoms')
        console.log(symptom_id)
        if (symptom_id.length > 0) {
            this.setState({ loading: true, loaded: false, animation: 'border', alert: false })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'manual'
            };

            fetch("https://" + login_url + "/login", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    let server_response = JSON.parse(result);
                    let login_token = server_response.Token;
                    var requestOptions = {
                        method: 'GET',
                        redirect: 'manual'
                    };
                    var url = "https://" + main_url + "/diagnosis?symptoms=[" + symptom_id + "]&gender=male&year_of_birth=1925&format=json&language=en-gb&token=" + login_token;
                    fetch(url, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (result.length > 0) {
                                console.log((result))
                                this.setState({ fetched_issues: result })
                                this.setState({ loading: false, loaded: true, animation: '' })
                            }
                            else {
                                this.setState({ loading: false, loaded: false, animation: '' })
                                this.setState({ alert: true, alert_message: "Sorry There is no record" })
                            }
                        })
                        .catch(error => console.log('error', error));

                })
                .catch(error => console.log('error', error));
        }
        else {
            this.setState({ alert: true, alert_message: "Please Select Symptoms", loading: false, loaded: false })
        }
    }
    render() {
        return (
            <div className="col-lg-6 mx-auto col-sm-12">
                <MultipleSelect />
                <Button variant="primary" size="lg" className="mt-1 float-right" onClick={() => { this.get_issue() }} disabled={this.state.loading}>
                    <Spinner
                        animation={this.state.animation}
                        size="md"
                    />
                    <span className="sr-only">Loading...</span> Search
      </Button>

                <br />
                <br />
                <br />

                {this.state.alert
                    ? <AlertDismissible closing_text={'close'} alert_type={'danger'} message={this.state.alert_message} />
                    : ''
                }
                {this.state.loading
                    ? <>
                        <LoadingDiv /><LoadingDiv /><LoadingDiv />
                    </>
                    : ''
                }

                {this.state.loaded & this.state.fetched_issues !== ''
                    ? <>
                        {
                            this.state.fetched_issues.map(function (issue, i) {
                                console.log(issue)
                                return <LoadedDiv issue={issue} key={i} />
                            })

                        }
                        <br /><br />
                    </>
                    : ''
                }


            </div>
        );
    }
}

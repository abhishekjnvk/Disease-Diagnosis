import React, { Component } from 'react';
import { LoadingDiseaseDiv, LoadedDiseaseDiv } from './skelton'







var header_array = ["Bearer Mi74R_XRPMAIL_COM_AUT:gOojdguRVl5VUsfSjnANuA==", "Bearer Ci72R_ETOYMAIL_COM_AUT:Hrzv6m07/r6YyBjYhL6vMw==", "Bearer Tb5k7_ETOYMAIL_COM_AUT:WdtRKsNDDUVGsCpAFqzLAQ==", "Bearer n5RZg_ETOYMAIL_COM_AUT:RHPArNAMatw41zNTfLjxpw==", "Bearer b5N6Z_ETOYMAIL_COM_AUT:KsbRaj0k0/5b0H/ix9skfA==", "Bearer d7ZBq_APRIMAIL_COM_AUT:MvF6nVh+T/m4J6ZFD5pevw==", "Bearer a7W4A_APRIMAIL_COM_AUT:GR/FcXf1WlG3HGT32SG2vA==", "Bearer y5D2Q_APRIMAIL_COM_AUT:mk+iQ7i6SMV2If+L9ie9GA==", "Bearer p9Y4J_ETOYMAIL_COM_AUT:f8Xu5EGVWLwJAzX/u+/1sQ==", "Bearer Dd4i8_CHORDMI_COM_AUT:EeWHFcC4c5kV6F3TQDdTkQ==", "Bearer q9LRi_CHORDMI_COM_AUT:4ruL6/xw/OmTkN44J1Ri2w==", "Bearer d2TYc_ETOYMAIL_COM_AUT:sHcvF98sNigYCEkde0amtQ==", "Bearer f6K9C_APRIMAIL_COM_AUT:T6r4PV0p8AZFSY0s959tQQ==", "Bearer Sp2r7_ETOYMAIL_COM_AUT:o+Rw9Jg8Gn9/0t4bKTPu1g=="]
var header_key = header_array[Math.floor(Math.random() * header_array.length)]
var myHeaders = new Headers();
myHeaders.append("Authorization", header_key);     //Production Header
// myHeaders.append("Authorization", "Bearer nolew96553@xrpmail.com:WNqhFdFBnIWDi8cJqlji9Q==");       //Development Header
// let login_url = "sandbox-authservice.priaid.ch";                         //Development Link
let login_url = "authservice.priaid.ch";
// let main_url = "sandbox-healthservice.priaid.ch";                        //Development Link
let main_url = "healthservice.priaid.ch"





export default class DiseasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched_issues: '',
            loading: true,
            loaded: false,
            disease_detail: ''
        };
    }
    fetch_disease_detail() {
        this.setState({ started_loading: true })
        let id = this.props.match.params.id;
        if (id !== "") {
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
                    fetch(`https://${main_url}/issues/${id}/info?token=${login_token}&format=json&language=en-gb`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result)
                            this.setState({ loading: false, loaded: true })
                            this.setState({ disease_detail: result })

                        })
                        .catch(error => console.log('error', error));

                })
                .catch(error => console.log('error', error));
        }
    }
    render() {
        return (
            <div class="container">
                {this.state.loading && !this.state.started_loading
                    ? (this.fetch_disease_detail())
                    : ''
                }

                {this.state.loading
                    ? (<LoadingDiseaseDiv />)
                    : ''
                }

                {this.state.loaded
                    ? (<LoadedDiseaseDiv disease={this.state.disease_detail} />)
                    : ''
                }

            </div>
        );
    }
}

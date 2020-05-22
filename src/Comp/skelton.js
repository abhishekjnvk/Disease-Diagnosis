import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: '100%',
        margin: theme.spacing(2),
    },
    media: {
        height: 190,
    },
}));

function Media(props) {
    const { loading = false } = props;
    const classes = useStyles();
    return (
        <Card className={classes.card = ' border border-dark mt-2'}>
            <CardHeader
                title={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    ) : (
                            <Link to={'view/' + props.ID}>
                                {props.title}</Link>
                        )
                }
                subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : 'Probability :' + props.Accuracy + ' %'}
            />

            <CardContent>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                ) : (
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                "ICD Name: " + props.IcdName
                            }
                        </Typography>
                    )}
            </CardContent>
        </Card>
    );
}

function DiseaseDiv(props) {
    const { loading = false } = props;
    const classes = useStyles();
    return (
        <Router>
            <Card className={classes.card = 'mt-2'}>
                <CardHeader
                    title={
                        loading ? (
                            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                        ) : (

                                <center><b>{props.Name}</b></center>
                            )
                    }
                />

                <CardContent>
                    {loading ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </React.Fragment>
                    ) : (<>
                        Other Name
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.Synonyms
                            }
                        </Typography><br />
                        Professional Name
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.ProfName
                            }
                        </Typography>
                    </>
                        )}
                </CardContent>

                <CardContent>
                    {loading ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={12} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={12} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={12} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={12} style={{ marginBottom: 6 }} />
                        </React.Fragment>
                    ) : (<>
                        Possible Symptoms
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.PossibleSymptoms
                            }
                        </Typography>
                        <br />Short Description:
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.DescriptionShort
                            }
                        </Typography>
                        <br />
                        Complete Description:
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.Description
                            }
                        </Typography>
                    </>
                        )}
                </CardContent>
                <CardContent>
                    {loading ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={12} style={{ marginBottom: 6 }} />
                        </React.Fragment>
                    ) : (<>
                        MedicalCondition:
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.MedicalCondition
                            }
                        </Typography>
                    </>
                        )}
                </CardContent>
                <CardContent>
                    {loading ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={12} style={{ marginBottom: 6 }} />
                        </React.Fragment>
                    ) : (<>
                        Possible Treatment:
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.TreatmentDescription
                            }
                        </Typography>
                    </>
                        )}
                </CardContent>
            </Card>
        </Router >
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};


DiseaseDiv.propTypes = {
    loading: PropTypes.bool,
};

export default function LoadingDiv(props) {
    return (
        <>
            <Media loading />
        </>
    );
}

export function LoadedDiv(props) {
    return (
        <>
            <Media title={props.issue.Issue.Name} Accuracy={props.issue.Issue.Accuracy} IcdName={props.issue.Issue.IcdName} ID={props.issue.Issue.ID} />
        </>
    );
}
export function LoadedDiseaseDiv(props) {
    return (
        <>
            <DiseaseDiv
                Name={props.disease.Name}
                DescriptionShort={props.disease.DescriptionShort}
                Synonyms={props.disease.Synonyms}
                Description={props.disease.Description}
                TreatmentDescription={props.disease.TreatmentDescription}
                ProfName={props.disease.ProfName}
                PossibleSymptoms={props.disease.PossibleSymptoms}
                MedicalCondition={props.disease.MedicalCondition} />
        </>
    );
}
export function LoadingDiseaseDiv(props) {
    return (
        <>
            <DiseaseDiv loading />
        </>
    );
}
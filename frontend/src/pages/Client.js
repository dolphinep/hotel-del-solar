import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        align:'center'
    }
});


class Client extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
<<<<<<< HEAD:frontend/src/pages/Client.js
                Client page
||||||| merged common ancestors
                Hello
=======
                Hello
                <Grid container spacing={3}>
                    <Grid  item xs={3}>
                        <Button className={classes.root} variant="contained">
                            Default
                    </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button className={classes.root} variant="contained">
                            Default
                    </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button className={classes.root} variant="contained">
                            Default
                    </Button>
                    </Grid>
                </Grid>
>>>>>>> 235cabafe68113545beff49eb3ff49a32449f103:frontend/src/pages/Home.js
            </div>
        )
    }
}
<<<<<<< HEAD:frontend/src/pages/Client.js
export default Client;
||||||| merged common ancestors
export default Home;
=======
export default withStyles(styles)(Home);
>>>>>>> 235cabafe68113545beff49eb3ff49a32449f103:frontend/src/pages/Home.js

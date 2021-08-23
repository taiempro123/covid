import React from "react";
import {Card, CardContent, Typography, makeStyles} from "@material-ui/core"


const useStyle  = makeStyles({
    wrapper : (props) => {
        if (props.type === 'confirmed') return {borderLeft : '5px solid red'}
        if (props.type === 'recovered') return {borderLeft : '5px solid  lightgreen'}
        return {borderLeft : '5px solid gray'}
    },
    title : {
        fontSize : 18, marginBottom: 5
    },
    count : {
        fontWeight : 'bold', fontSize : 18
    }
});

export default function HighlightCard({title, count, type}) {
    const styles = useStyle({type});
    


  return(
    <Card className={styles.wrapper}>
       <CardContent>
       <Typography component = "p" variant = "body2" className={styles.title}>{title}</Typography>
       <Typography component = "span" variant = "body2" className={styles.count}>{count}</Typography>
       </CardContent>
     </Card>

  )
     
   
}

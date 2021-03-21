import { connect } from 'react-redux';
import Article from '../components/Article';
export default connect(
    function (state,user) {
        var title,desc,explain;
        
        if(state.mode === 'WELCOME'){
            title = state.welcome_content.title;
            desc = state.welcome_content.desc;
            explain = state.welcome_content.explain;
        } else {
            for(var i=0; i<state.contents.length;i++){
                var d = state.contents[i];
                if(d.id === state.selected_content_id) {
                    if(d.id === 1) {
                        title = user.major.map(value => {
                            return value.question;
                        })
                        desc = user.major.map(value => {
                            return value.answer;
                        })
                        explain = d.explain;
                    } else if(d.id === 2) {
                        title = user.living.map(value => {
                            return value.question;
                        })
                        desc = user.living.map(value => {
                            return value.answer;
                        })
                        explain = d.explain;
                    } else if(d.id === 3) {
                        title = user.enrollment.map(value => {
                            return value.question;
                        })
                        desc = user.enrollment.map(value => {
                            return value.answer;
                        })
                        explain = d.explain;
                    } else if(d.id === 4) {
                        title = user.scholarship.map(value => {
                            return value.question;
                        })
                        desc = user.scholarship.map(value => {
                            return value.answer;
                        })
                        explain = d.explain;
                    } else if(d.id === 5) {
                        title = user.support.map(value => {
                            return value.question;
                        })
                        desc = user.support.map(value => {
                            return value.answer;
                        })
                        explain = d.explain;
                    }
                    
                    break;
                } 
                /*switch(state.selected_content_id) {
                    case '1': title = user.major.question; desc = user.major.answer; explain = d.explain;
                    break;
                    case '2': title = user.living.question; desc = user.living.answer; explain = d.explain;
                    break;
                    case '3': title = user.enrollment.question; desc = user.enrollment.answer; explain = d.explain;
                    break;
                    case '4': title = user.scholarship.question; desc = user.scholarship.answer; explain = d.explain;
                    break;
                    case '5': title = user.support.question; desc = user.support.answer; explain = d.explain;
                    break;
                } */
            }
        } 
        return {
            title:title,
            desc:desc,
            explain:explain
        }
    }
)(Article);
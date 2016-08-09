const React = require('react');
const SubjectStore = require('../stores/subject_store');
const SubjectActions = require('../actions/subject_actions');
const SubjectForm = require('./subject_form');
const Link = require('react-router').Link;

const UserSubjectIndex = React.createClass({
  getInitialState(){
    return { subjects: SubjectStore.subscribed() };
  },

  componentDidMount(){
    this.subjectListener = SubjectStore.addListener(this.handleSubjectChange);
    SubjectActions.fetchAllSubjects();
  },

  componentWillUnmount() {
    this.subjectListener.remove();
  },

  handleSubjectChange(){
    this.setState({
      subjects: SubjectStore.subscribed()
    });
  },

  render(){
    let userSubjects;
    if (this.state.subjects){
      userSubjects = this.state.subjects.map( subject => {
        return (
          <li className="group user-subject-list-item" key={subject.id}>
            <a className="index-subject-thumb"><img src={`${subject.image_url}`}/></a>
            <Link to={`/library/${subject.id}`}>
              {subject.title}
            </Link>
        </li>);
      });
    }
    return (
      <aside className="user-subject-index">
        <header className="subject-index-header">
          <h3>Subjects</h3>
        </header>
        <SubjectForm />
        <ul className="group user-subject-list">
          {userSubjects}
        </ul>
      </aside>
    );
  }
});


module.exports = UserSubjectIndex;

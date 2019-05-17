import React from "react";
import { connect } from "react-redux";
import { getWorkSheetData } from "../../../actions";
import WorkSheet from "./WorkSheet";
class WorkSheetDataLayer extends React.Component {
  componentDidMount() {
    this.props.getWorkSheetData();
  }

  render() {
    return <WorkSheet workSheetData={this.props.workSheetData} />;
  }
}
const mapStateToProps = ({ workSheetData }) => {
  return { workSheetData };
};
export default connect(
  mapStateToProps,
  { getWorkSheetData }
)(WorkSheetDataLayer);

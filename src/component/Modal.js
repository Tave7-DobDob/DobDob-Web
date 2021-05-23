import React, { Component } from 'react';
export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      isOpenMoal: false,
    };

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpenMoal: false
      })
    }
    else {
      this.setState({
        isOpenMoal: true,
      })
    }
  }
  render() {
    return <div ref={this.setWrapperRef} value={this.props.setIsOpenModal(this.state.isOpenMoal)} className="modal">
      {this.props.children}

    </div>;
  }
}
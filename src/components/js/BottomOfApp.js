import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const BottomOfApp = ({ goBackRouteName, goToNextClick }) => {
  const navigate = useNavigate()
  return (
    <div className="right-btn-box">
      <Button
        type="button"
        onClick={() => navigate(`/${goBackRouteName}`)}
        content="이전"
      />
      {goToNextClick && (
        <Button type="submit" primary onClick={goToNextClick} content="다음" />
      )}
    </div>
  )
}

BottomOfApp.propTypes = {
  goBackRouteName: PropTypes.string.isRequired,
  goToNextClick: PropTypes.func
}

export default BottomOfApp

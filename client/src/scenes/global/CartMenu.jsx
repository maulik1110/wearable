import {Box, Button , Divider, IconButton, Typography} from '@mui/material'

import {useSelector, useDispatch} from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import styled from '@emotion/styled'
import { shades } from '../../theme'
import RemoveIcon from '@mui/icons-material/Remove'
import { deccreaseCount, increaseCount, removeFromCart, setIsCartOpen } from '../../state'
import { useNavigate } from 'react-router-dom'

const FlexBox = styled(Box)`
display: flex;
justify-content:spacr-between;
align-items: center;
`
import React from 'react'

const cartMenu = () => {
  return (
    <div>cartMenu</div>
  )
}

export default cartMenu
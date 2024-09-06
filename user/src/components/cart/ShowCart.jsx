import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { IoCartSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { bagActions } from '../../store/bagSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdShoppingCart } from "react-icons/md";

export default function ShowCart() {
  const [state, setState] = React.useState({ right: false });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [itemToRemove, setItemToRemove] = React.useState(null);

  const URI = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.bag) || { totalQuantity: 0, data: [] };

  

  console.log("cart",bag)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Box
        sx={{ width: 400 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Typography variant="h6" gutterBottom className='px-5'>
          Your Cart
        </Typography>
        {bag.data.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List>
              {bag.data.map((item, index) => (
                <ListItem key={index} disablePadding className='px-5 my-4'>
                  <Avatar
                    alt={item.name}
                    src={`${URI}${item?.thumbnail}`}
                    sx={{ width: 56, height: 56, marginRight: 2 }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} | Price: ₹${item.price}`}
                  />

                  <IconButton
                    aria-label="delete"
                    onClick={() => confirmDelete(item)}
                    sx={{ color: 'red' }} // Set the color to green
                  >
                    <DeleteIcon sx={{ fontSize: '2rem' }} /> {/* Increase the icon size */}
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}
      </Box>
      <div className='flex justify-center content-center items-center fixed bottom-0 m-0 w-[400px]'>
        <Button
          variant="contained"
          onClick={handleviewcart}
          disabled={bag.data.length === 0}
          sx={{ borderRadius: 0, backgroundColor: 'primary.main', width: "70%", height: "50px", color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
        >
          View Details and Edit Cart
        </Button>
        <Button
          variant="contained"
          onClick={handleCheckout}
          disabled={bag.data.length === 0}
          sx={{ borderRadius: 0, backgroundColor: 'error.main', color: 'white', width: "40%", height: "50px", '&:hover': { backgroundColor: 'error.dark' } }}
        >
          Order Now
        </Button>
      </div>
    </>
  );

  const confirmDelete = (item) => {
    setItemToRemove(item);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    // Dispatch action to remove item from the bag
    dispatch(bagActions.removeFromBag({ productId: itemToRemove.productId }));
    setOpenDialog(false); // Close the dialog
  };

  const handleCheckout = () => {
    // Logic to checkout items
    navigate('/CheckoutForm'); // Navigate to checkout page using react-router-dom
  };

  const handleviewcart = () => {
    // Logic to view cart items
    navigate('/viewCartDeatils'); // Navigate to cart page using react-router-dom
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer('right', true)}
        className='relative  '
       
      >
        {/* Cart icon always visible */}
        <MdShoppingCart  className='text-black  text-2xl'/>

        {/* Conditionally show the item count */}
        {bag.totalQuantity > 0 && (
          <p className='absolute h-7 w-7 -right-0 -top-5 bg-deep-purple-400 rounded-full text-white'>
            {bag.totalQuantity}
          </p>
        )}
      </Button>

      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to remove {itemToRemove?.name} from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
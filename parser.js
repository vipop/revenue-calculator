/*
     Using JQuery to retrieve the JSON and call the function.
*/
$(document).ready(function(){
            // initially hide the empty list and the total revenues
            $(orderList).hide();
            $(revenues).hide();
            // when the button is clicked
            $("button").click(function(){
                        // show the orderList
                        $(orderList).show();
                        $(revenues).show();
                        // fetch the JSON
                        $.getJSON("https://shop-test-web.000webhostapp.com/orders.json",
                        // run the function
                        function(result){
                                    getOrderId(result);
                        });
                        $(button).hide();
            });
});

/*
Show a list of all the orders plus Total Revenue with/without Tax.
*/
function getOrderId(result)
{
            var orderId;
            var orderPrice;
            
            // Total Revenue before Tax
            var totalRevenueBT = 0;
            // Number of orders in the JSON
            var size = Object.keys(result.orders).length;
            // Go through each order
            for (i = 0; i < size; i++)
            {
                        // get the OrderId
                        orderId = Number(result.orders[i].id);
                        // get the Order Total Price
                        orderPrice = Number(result.orders[i].total_price);
                        // add the Order Total Price to the Total Revenue before Tax
                        totalRevenueBT += orderPrice;
                        // append the order to the list
                        document.getElementById("orderList").innerHTML += "Order #" + orderId + ": " + orderPrice + " CAD\n";
            }
            // display the Total Revenue without Tax
            document.getElementById("totalRevenueBT").innerHTML = "Total Revenue without Tax: " + totalRevenueBT.toFixed(2) + " CAD";
            // calculate Total Revenue including Tax
            var totalRevenue = totalRevenueBT + totalRevenueBT * 13/100;
            // display the Total Revenue including Tax
            document.getElementById("totalRevenue").innerHTML = "Total Revenue including Tax(13%): " + totalRevenue.toFixed(2) + " CAD";
}

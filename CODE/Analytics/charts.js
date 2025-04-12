window.addEventListener('load', function () {
    const driveCSVUrl = 'https://67f690bb2f4b9f0457dd8ab7--tranquil-kringle-ec12be.netlify.app/full_data.csv';
    fetchCSV(driveCSVUrl);

    function fetchCSV(url) {
        fetch(url)
            .then(response => response.text())
            .then(csvData => {
                const parsedData = Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true
                });
    
                const original = parsedData.data;
                const dataRows = original.filter(row => row.merchant_name === "Crepe Delight");
    
                // === Chart 1: Orders per merchant ===
                // drawMerchantOrderChart(dataRows);
    
                // === Chart 2: Orders over time for Crepe Delight ===
                drawCrepeDelightOrdersOverTime(dataRows);
    
                // === Chart 3: Metrics for Crepe Delight ===
                drawCrepeDelightMetrics(dataRows); // Only call it once
                
                // === Chart 4: Orders by weekday ===
                drawOrdersByWeekday(dataRows)

                // === Chart 5: Top selling items ===
                drawTopSellingItems(dataRows);

                // === Chart 6: Revenue by cuisine ===
                drawRevenueByCuisine(dataRows);

                // === Chart 11: Top items ===
                drawTopItems(dataRows);

                // === Chart 7: Average delivery time trend ===
                drawAverageDeliveryTimeTrend(dataRows);

                // === Chart 8: Customer metrics ===
                drawCustomerMetrics(dataRows);

                // === Chart 12: Top customers by spend ===
                drawTopCustomersBySpend(dataRows);

                // === Chart 9: Order heatmap ===
                drawOrderHeatmap(dataRows);

                // === Chart 10: Churn detection ===
                drawChurnDetection(dataRows);

                

                
            })
            .catch(error => {
                console.error("Error fetching CSV file: ", error);
            });
    }
    
    // Chart 1: Orders per merchant (your original logic)
    function drawMerchantOrderChart(dataRows) {
        const merchantOrderCount = {};
    
        dataRows.forEach(row => {
            const merchantName = row.merchant_name;
            if (merchantOrderCount[merchantName]) {
                merchantOrderCount[merchantName]++;
            } else {
                merchantOrderCount[merchantName] = 1;
            }
        });
    
        const labels = Object.keys(merchantOrderCount);
        const data = Object.values(merchantOrderCount);
    
        const ctx = document.getElementById('orderChart1').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Orders',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Number of Orders' }
                    },
                    x: {
                        title: { display: true, text: 'Merchant' }
                    }
                }
            }
        });
    }
    
    let chart1Instance = null;  // Declare chart instance variable

    function drawCrepeDelightOrdersOverTime(dataRows) {


        const ordersByDate = {};

        dataRows.forEach(row => {
            const dateObj = new Date(row.order_time);
            if (isNaN(dateObj)) return;

            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            if (!ordersByDate[dateStr]) {
                ordersByDate[dateStr] = 1;
            } else {
                ordersByDate[dateStr]++;
            }
        });

        const sortedDates = Object.keys(ordersByDate).sort();
        const orderCounts = sortedDates.map(date => ordersByDate[date]);

        // If there's an existing chart, destroy it
        if (chart1Instance) {
            chart1Instance.destroy();
        }

        const ctx = document.getElementById('orderChart2').getContext('2d');
        chart1Instance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedDates,
                datasets: [{
                    label: 'Daily Orders - Crepe Delight',
                    data: orderCounts,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Orders' }
                    },
                    x: {
                        title: { display: true, text: 'Date' }
                    }
                }
            }
        });

    }


    // CHART 3

    function drawCrepeDelightMetrics(dataRows) {

    
        const totalOrders = dataRows.length;
        const totalRevenue = dataRows.reduce((sum, row) => sum + parseFloat(row.item_price || 0), 0);
        const avgOrderValue = totalRevenue / totalOrders;
    
        // Draw the metrics using doughnut charts on canvas
        drawMetricChart('metricTotalOrders', totalOrders);
        drawMetricChart('metricTotalRevenue', `$${totalRevenue.toFixed(2)}`);
        drawMetricChart('metricAOV', `$${avgOrderValue.toFixed(2)}`);
    }
    
    // Custom plugin to draw text in center
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw(chart) {
            const { width, height, ctx, config } = chart;
            const value = config.options.customText;
            ctx.save();
            ctx.font = 'bold 40px sans-serif';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(value, width / 2, height / 2);
            ctx.restore();
        }
    };
    
    function drawMetricChart(canvasId, value) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [1],
                    backgroundColor: ['#4bc0c0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: false,
                cutout: '80%',
                customText: value,
                plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false }
                }
            },
            plugins: [centerTextPlugin]
        });
    }
    
    function drawOrdersByWeekday(dataRows) {

        const weekdayCounts = {
            'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0,
            'Friday': 0, 'Saturday': 0, 'Sunday': 0
        };
    
        dataRows.forEach(row => {
            const date = new Date(row.order_time);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
            if (weekday in weekdayCounts) {
                weekdayCounts[weekday]++;
            }
        });
    
        const labels = Object.keys(weekdayCounts);
        const values = Object.values(weekdayCounts);
    
        const ctx = document.getElementById('weekdayChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Orders',
                    data: values,
                    backgroundColor: '#36a2eb',
                    borderRadius: 5
                }]
            },
            options: {
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    function drawTopSellingItems(dataRows) {
        const itemStats = {};
    
        dataRows.forEach(row => {
            const itemName = row.item_name;
            const itemPrice = parseFloat(row.item_price);
    
            if (!itemStats[itemName]) {
                itemStats[itemName] = {
                    total_sold: 0,
                    total_revenue: 0
                };
            }
    
            itemStats[itemName].total_sold += 1;
            itemStats[itemName].total_revenue += itemPrice;
        });
    
        // Convert to array and compute average price
        const itemArray = Object.entries(itemStats).map(([name, stats]) => ({
            name: name,
            total_sold: stats.total_sold,
            total_revenue: stats.total_revenue,
            avg_price: stats.total_revenue / stats.total_sold
        }));
    
        // Sort by total_sold descending and take top 10
        const topItems = itemArray.sort((a, b) => b.total_sold - a.total_sold).slice(0, 10);
    
        // Prepare labels and data for Chart.js
        const labels = topItems.map(item => item.name);
        const values = topItems.map(item => item.total_sold);
    
        const ctx = document.getElementById('topItemsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Sold',
                    data: values,
                    backgroundColor: '#ff6384',
                    borderRadius: 5
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Top 10 Selling Items'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });


        //--------------------------------
    
    }

    function drawRevenueByCuisine(dataRows) {
        const cuisineRevenue = {};
    
        dataRows.forEach(row => {
            const cuisine = row.cuisine_tag;
            const price = parseFloat(row.item_price);
    
            if (!cuisineRevenue[cuisine]) {
                cuisineRevenue[cuisine] = 0;
            }
    
            cuisineRevenue[cuisine] += price;
        });
    
        // Sort cuisines by revenue descending
        const sortedEntries = Object.entries(cuisineRevenue)
            .sort((a, b) => b[1] - a[1]);
    
        const labels = sortedEntries.map(entry => entry[0]);
        const values = sortedEntries.map(entry => entry[1]);
    
        const ctx = document.getElementById('cuisineRevenueChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue ($)',
                    data: values,
                    backgroundColor: '#4bc0c0',
                    borderRadius: 5
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: '📊 Revenue by Cuisine'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    

    function drawAverageDeliveryTimeTrend(dataRows) {
        const deliveryTimeByDate = {};
    
        // Step 1: Group and aggregate total_delivery_time per date
        dataRows.forEach(row => {
            const date = new Date(row.order_time).toISOString().split('T')[0]; // extract YYYY-MM-DD
            const totalDeliveryTime = (
                new Date(row.delivery_time) - new Date(row.order_time)
            ) / (1000 * 60); // in minutes
    
            if (!deliveryTimeByDate[date]) {
                deliveryTimeByDate[date] = { total: 0, count: 0 };
            }
    
            deliveryTimeByDate[date].total += totalDeliveryTime;
            deliveryTimeByDate[date].count += 1;
        });
    
        // Step 2: Calculate average per date
        const sortedDates = Object.keys(deliveryTimeByDate).sort();
        const avgTimes = sortedDates.map(date => {
            const entry = deliveryTimeByDate[date];
            return entry.total / entry.count;
        });
    
        // Step 3: Plot
        const ctx = document.getElementById('deliveryTimeTrendChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedDates,
                datasets: [{
                    label: 'Avg Delivery Time (minutes)',
                    data: avgTimes,
                    borderColor: '#36a2eb',
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: '📉 Average Delivery Time Over Time'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Minutes'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Order Date'
                        }
                    }
                }
            }
        });
    }
    

    function drawCustomerMetrics(dataRows) {
        const customerCount = {};
        dataRows.forEach(row => {
            const id = row.eater_id;
            customerCount[id] = (customerCount[id] || 0) + 1;
        });

        const uniqueCustomers = Object.keys(customerCount).length;
        const repeatCustomers = Object.values(customerCount).filter(count => count > 1).length;
        const repeatRate = ((repeatCustomers / uniqueCustomers) * 100).toFixed(2) + '%';

        drawMetricChart('metricUniqueCustomers', uniqueCustomers.toString());
        drawMetricChart('metricRepeatRate', repeatRate);
    }

    function drawOrderHeatmap(dataRows) {
        // Aggregate order counts by weekday and hour
        const counts = {};
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
        dataRows.forEach(row => {
            const orderTime = new Date(row.order_time);
            const weekday = weekdays[orderTime.getDay()];
            const hour = orderTime.getHours();
    
            if (!counts[weekday]) counts[weekday] = {};
            if (!counts[weekday][hour]) counts[weekday][hour] = 0;
    
            counts[weekday][hour]++;
        });
    
        // Determine all active hours (remove hours with no orders at all)
        const allHours = new Set();
        for (const day in counts) {
            Object.keys(counts[day]).forEach(hour => allHours.add(parseInt(hour)));
        }
        const sortedHours = [...allHours].sort((a, b) => a - b);
    
        // Build heatmap matrix
        const z = weekdays.map(day =>
            sortedHours.map(hour => counts[day]?.[hour] || 0)
        );
    
        const data = [{
            z: z,
            x: sortedHours,
            y: weekdays,
            type: 'heatmap',
            colorscale: 'YlOrRd',
            reversescale: true,  // Reverse color scale
            colorbar: {
                tickvals: [0, 1, 5, 10],  // Adjusted tick values for color scale
                ticktext: ['0', '1', '5', '10']  // Custom labels for the color scale
            }
        }];
    
        const layout = {
            title: '🔥 Order Heatmap (Day vs Hour)',
            xaxis: {
                title: 'Hour of Day',
                tickmode: 'array',
                tickvals: sortedHours,  // Show only the hours with data
                ticktext: sortedHours.map(hour => hour + ':00')  // Format hours nicely
            },
            yaxis: {
                title: 'Weekday'
            },
            margin: { t: 40, l: 70 },
            height: 600
        };
    
        Plotly.newPlot('orderHeatmap', data, layout);
    }

    function drawChurnDetection(dataRows) {
        const currentDate = new Date(); // Current date
        const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30)); // 30 days ago
    
        // Group by eater_id and find the last order date for each customer
        const lastOrderDate = {};
        dataRows.forEach(row => {
            const orderTime = new Date(row.order_time);
            const eaterId = row.eater_id;
    
            // Update last order date for each eater_id
            if (!lastOrderDate[eaterId] || orderTime > lastOrderDate[eaterId]) {
                lastOrderDate[eaterId] = orderTime;
            }
        });
    
        // Count customers who haven't ordered in the last 30 days
        const inactiveCustomers = Object.values(lastOrderDate).filter(date => date < thirtyDaysAgo).length;
    
        // Display the result
        const ctx = document.getElementById('churnDetection').getContext('2d');
        ctx.font = 'bold italic 40px Arial';
        ctx.strokeText("🚪 Potentially Churned Customers:\n", 100, 100);
        ctx.strokeText(inactiveCustomers, 100, 100);
        ctx.strokeText("\n", 100, 100);
        ctx.strokeText("customers haven’t returned in 30 days.", 100, 100);
    }
    
    function drawTopItems(dataRows) {
    const itemStats = {};

    dataRows.forEach(row => {
        const itemName = row.item_name;
        const itemPrice = parseFloat(row.item_price);
        if (!itemStats[itemName]) {
            itemStats[itemName] = { totalSold: 0, totalRevenue: 0 };
        }
        itemStats[itemName].totalSold += 1;
        itemStats[itemName].totalRevenue += itemPrice;
    });

    const sortedItems = Object.keys(itemStats)
        .map(itemName => {
            const stats = itemStats[itemName];
            return {
                itemName,
                totalSold: stats.totalSold,
                totalRevenue: stats.totalRevenue,
                avgPrice: stats.totalRevenue / stats.totalSold
            };
        })
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 10);

    const table = document.getElementById('topItemsTable');
    table.innerHTML = ''; // Clear existing content

    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Item Name</th>
            <th>Total Sold</th>
            <th>Total Revenue</th>
            <th>Average Price</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    sortedItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.totalSold}</td>
            <td>$${item.totalRevenue.toFixed(2)}</td>
            <td>$${item.avgPrice.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
}


    function drawTopCustomersBySpend(dataRows) {
    // Aggregate customer spend data
    const customerSpend = {};

    dataRows.forEach(row => {
        const eaterId = row.eater_id;
        const orderValue = parseFloat(row.order_value);

        if (!customerSpend[eaterId]) {
            customerSpend[eaterId] = 0;
        }

        customerSpend[eaterId] += orderValue;
    });

    // Create an array of customers with aggregated spend data
    const sortedCustomers = Object.keys(customerSpend)
        .map(eaterId => ({
            eaterId,
            totalSpend: customerSpend[eaterId]
        }))
        .sort((a, b) => b.totalSpend - a.totalSpend)
        .slice(0, 5); // Top 10 customers

    const table = document.getElementById('topCustomersTable');
    table.innerHTML = ''; // Clear table before populating

    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Customer ID</th>
            <th>Total Spend</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    sortedCustomers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.eaterId}</td>
            <td>$${customer.totalSpend.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
}



    
});

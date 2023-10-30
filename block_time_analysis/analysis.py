from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt

# Read the data from the file
data = pd.read_csv('data_post_merge.txt')
#data = pd.read_csv('test.txt')
#data = pd.read_csv('data_pre_merge.csv')

# Convert the 'time' column to datetime objects
data['time'] = pd.to_datetime(data['time'])

# Calculate the time differences
data['time_diff'] = data['time'].diff()

# Calculate the average time difference
average_time_diff = data['time_diff'].mean()

# Calculate the maximum time difference
max_time_diff = data['time_diff'].max()
min_time_diff = data['time_diff'].min()

# Count how often the time difference is not equal to 12 seconds
count_not_12_seconds = (data['time_diff'] != pd.Timedelta(seconds=12)).sum()
count_12_seconds = (data['time_diff'] == pd.Timedelta(seconds=12)).sum()
time_diff_counts = data['time_diff'].value_counts()

# Print the result
print(f'Average time difference: {average_time_diff}')
print(f'Maximum time difference: {max_time_diff}')
print(f'Minimal time difference: {min_time_diff}')
print(f'Count of time differences not equal to 12 seconds: {count_not_12_seconds}')
print(f'Count of time differences equal to 12 seconds: {count_12_seconds}')
print(time_diff_counts)


data = data.dropna()

# Get unique time difference values and their counts
time_diff_values = data['time_diff'].dt.total_seconds()
unique_values, value_counts = time_diff_values.value_counts().index, time_diff_values.value_counts().values

total_count = len(time_diff_values)
percentage_values = (value_counts / total_count) * 100
print(total_count)

for val, count, percentage in zip(unique_values, value_counts, percentage_values):
    print(f"Value: {val}, Count: {count}, Percentage: {percentage:.2f}%")

# Create a bar chart with unique time difference values on the x-axis
plt.figure(figsize=(12, 6))
plt.bar(unique_values, value_counts, log=True, width=3)
plt.title('Block Time (Logarithmic Scale)')
plt.xlabel('Time Difference (seconds)')
plt.ylabel('Frequency (log-scale)')
plt.xticks(unique_values, rotation=0)

fixed_y_ticks = value_counts

# Set the y-axis ticks and labels
plt.yticks(fixed_y_ticks, [str(val) for val in fixed_y_ticks])


# Show the chart
plt.savefig('time_difference_bar.png', bbox_inches='tight', dpi=300)
plt.close()



data = data.dropna()

# Create a line chart of time differences
plt.figure(figsize=(30, 6))
plt.plot(data.index, data['time_diff'].dt.total_seconds(), marker='o', linestyle='', markersize=1)
plt.title('Time Differences Between Entries')
plt.xlabel('Entry Index')
plt.ylabel('Time Difference (seconds)')
plt.grid(True)

plt.savefig('time_difference_plot.png', bbox_inches='tight')
plt.close()


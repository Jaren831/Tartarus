import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 90 },
  { name: 'Group B', value: 10 }
  // { name: 'Group C', value: 300 },
  // { name: 'Group D', value: 200 }
];

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`${(percent * 100).toFixed(2)}%`}</text>
    </g>
  );
};

export default class Chart extends PureComponent {
  state = {
    activeIndex: 0,
    moderators: this.props.moderators
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    console.log(this.props.moderators);
    console.log(data);
    return (
      <div
        style={{
          width: '100%',
          height: 300,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart width={'100%'} height={'100%'}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.moderators}
              // data={data}
              cx={'50%'}
              cy={'50%'}
              innerRadius={60}
              outerRadius={80}
              fill='#33a0ff'
              dataKey='value'
              nameKey='name'
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
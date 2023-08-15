import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { sendRequest } from '../../../core/config/request';
import { requestMethods } from '../../../core/enums/requestMethods';

function CourseReport( {course,onClose}) {

    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await sendRequest({
                route: `/user/admin/course-report/${course}`,
                method: requestMethods.GET,
            });
            console.log(response)
            const totalEnrollments = response.total_enrollments;
                const completedEnrollments = response.completed_enrollments;
                const totalDegrees = 360;

                const totalEnrollmentsAngle = (totalEnrollments / totalDegrees) * totalDegrees;
                const completedEnrollmentsAngle = (completedEnrollments / totalDegrees) * totalDegrees;

            setReportData([
                {
                    "id": "Total",
                    "label": "Total Enrolled",
                    "value": totalEnrollmentsAngle,
                    "color": "hsl(299, 70%, 50%)"
                },
                {
                    "id": "Completed",
                    "label": "Completed Course",
                    "value": completedEnrollmentsAngle,
                    "color": "hsl(276, 70%, 50%)"
                },
            ])
            } catch (error) {
            console.error('failed:', error);
            }
        };
    
        fetchData();
    }, [course]);


    const MyResponsivePie = ({ data}) => (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
    return (
        <div className='course-report'>
            {reportData.length > 0 ? <MyResponsivePie data={reportData} /> : <p>Loading data...</p>}
            <span className='close-text' onClick={onClose}>Close</span>
        </div>
    )
}

export default CourseReport


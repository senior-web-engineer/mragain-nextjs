import { Calendar } from "@/components/common/Calendar";
import { CalendarRange } from "@/components/common/Calendar/CalendarRange";
import Input from "@/components/ui/Input";
import { RowWrapper, HoursEditor, HoursEditorTitle } from "./styles";
import { Row, Col, Divider, Button, TimePicker } from "antd";
import Select from "@/components/ui/Select";
import moment from "moment";

export const OperationalHoursCalendar = () => {
    return (
        <RowWrapper>
            <Col span={16}>
                {/* <Calendar /> */}
                <CalendarRange />
            </Col>
            <Col span={8}>
                <HoursEditor>
                    <Col>
                        <HoursEditorTitle>Title</HoursEditorTitle>
                        <Input
                            small
                            placeholder="Enter Title"
                            size="small"
                            allowClear
                            onChange={console.log}
                        />
                    </Col>
                    <Col>
                        <HoursEditorTitle>Schedule</HoursEditorTitle>
                        <Row>
                            <Col span={12}>
                                <TimePicker
                                    size="large"
                                    defaultValue={moment(moment.now(), "HH:mm")}
                                    format="HH:mm"
                                />
                            </Col>
                            <Col span={12}>
                                <TimePicker
                                    size="large"
                                    defaultValue={moment(moment.now(), "HH:mm")}
                                    format="HH:mm"
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <HoursEditorTitle>Repeat</HoursEditorTitle>
                        <Select
                            small
                            defaultValue="year"
                            options={[
                                {
                                    value: "year",
                                    label: "Every Year",
                                },
                                {
                                    value: "month",
                                    label: "Every Month",
                                },
                                {
                                    value: "week",
                                    label: "Every Week",
                                },
                            ]}
                            size="large"
                            onChange={console.log}
                        />
                    </Col>
                    <Divider />
                    <Row type="flex" justify="space-between">
                        <Button size="large">Clear</Button>
                        <Button size="large" type="primary">
                            Add
                        </Button>
                    </Row>
                </HoursEditor>
            </Col>
        </RowWrapper>
    );
};

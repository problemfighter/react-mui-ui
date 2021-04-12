import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {List, ListItem, RootRef} from "../ui-component";
import React from "react";

class TrSimpleDnDState implements TRState {
    itemList: any[] = []
}

export interface TRSimpleDnDProps extends TRProps {
    itemList: any[]
    children(item: any): any;
    onDragEnd(itemList: any): any;
}

const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default class TrSimpleSortAndDnd extends TRReactComponent<TRSimpleDnDProps, TrSimpleDnDState> {

    state: TrSimpleDnDState = new TrSimpleDnDState();

    constructor(props: TRSimpleDnDProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({itemList: this.props.itemList})
    }

    componentDidUpdate(prevProps: TRSimpleDnDProps) {
        if (this.props.itemList !== prevProps.itemList) {
            this.setState({itemList: this.props.itemList})
        }
    }

    onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }

        let _this = this;
        const itemList = reorder(
            _this.state.itemList,
            result.source.index,
            result.destination.index
        );

        this.setState({
            itemList: itemList
        });
        this.props.onDragEnd(itemList)
    }

    getListItemStyle(isDragging: any, draggableStyle: any) {
        return ({
            ...draggableStyle,
            ...(isDragging && {
                background: "rgb(235,235,235)"
            })
        })
    };

    render() {
        const _this = this;
        return (
            <DragDropContext onDragEnd={(isDraggingOver: any) => {
                _this.onDragEnd(isDraggingOver);
            }}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                            <List>
                                {this.state.itemList.map((item: any, index: any) => (
                                    <Draggable key={item.id} draggableId={"" + item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <ListItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={_this.getListItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {_this.props.children(item)}
                                            </ListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        </RootRef>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}
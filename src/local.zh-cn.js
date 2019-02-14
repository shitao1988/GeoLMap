L.drawLocal = {
	draw: {
		toolbar: {
			// #TODO: this should be reorganized where actions are nested in actions
			// ex: actions.undo  or actions.cancel
			actions: {
				title: '取消绘制',
				text: '取消'
			},
			finish: {
				title: '完成绘制',
				text: '完成'
			},
			undo: {
				title: '删除最后一个已绘制的点',
				text: '删除最后绘制点'
			},
			buttons: {
				polyline: '绘制多段线',
				polygon: '绘制多边形',
				rectangle: '绘制长方形',
				circle: '绘制圆',
				marker: '绘制标记'
			}
		},
		handlers: {
			circle: {
				tooltip: {
					start: '点击并拖拽以绘制圆'
				},
				radius: '半径'
			},
			marker: {
				tooltip: {
					start: '点击地图放置'
				}
			},
			polygon: {
				tooltip: {
					start: '点击开始绘制面',
					cont: '点击继续绘制面',
					end: '点击第一个点完成绘制面'
				}
			},
			polyline: {
				error: '<strong>错误:</strong> 不可自交叉!',
				tooltip: {
					start: '点击开始绘制线',
					cont: '点击继续绘制面',
					end: '点击最后一个点完成绘制线'
				}
			},
			rectangle: {
				tooltip: {
					start: '点击并拖拽以绘制圆矩形'
				}
			},
			simpleshape: {
				tooltip: {
					end: '放开鼠标完成绘制'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: '保存修改',
					text: '保存'
				},
				cancel: {
					title: '取消编辑，放弃修改',
					text: '取消'
				}
			},
			buttons: {
				edit: '编辑图层',
				editDisabled: '没有图层可编辑',
				remove: '删除图层',
				removeDisabled: '没有图层可删除'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: '拖动控制点或标记以修改要素',
					subtext: '点击取消放弃修改'
				}
			},
			remove: {
				tooltip: {
					text: '点击一个要素以删除'
				}
			}
		}
	}
};
// toolbar
// const searchBarItems = [
    //   { label: '归属公司', value: belongCompanyName, onChangeFunc: handleChangeCompany, options: belongCompanyOptions },
    //   { label: '厂站类型', value: powerStationType, onChangeFunc: handleChangeStationType, options: stationTypeOptions },
    //   { label: '电压等级', value: voltageLevel, onChangeFunc: handleChangeVoltageLevel, options: stationLevelOptions },
    //   { label: '底图类型', value: baseImage, onChangeFunc: handleChangeBaseImgType, options: backgroundAreaOptions },
    //   { label: '底图区域', value: baseImageArea, onChangeFunc: handleChangeBaseImgArea, options: voltageLevelOptions },
    // ]
{/* </div> */ }
{/* <div className="row-wrap">
          <div className="search-item-wrap">
            <h1 className='ipt-label'>搜索查询</h1>
            <div>
              <Input
                className="search-box"
                placeholder="输入厂站名称搜索"
                value={searchField}
                prefix={<SearchOutlined />}
                onPressEnter={(e: any) => handleChangeSearchField(e.target.value)}
              />
            </div>
          </div>
          {additionalActions}
        </div>
        
        <div className="row-wrap">
          {
            searchBarItems.map(item => {
              return (
                <div className="search-item-wrap" key={item.label}>
                  <h1 className='ipt-label'>{item.label}</h1>
                  <Select
                    value={item.value}
                    style={{ width: selectCompWidth }}
                    onChange={item.onChangeFunc}
                    options={item.options}
                  />
                </div>
              )
            })
          } 
          <div className="search-item-wrap">
            <h1 className='ipt-label'>更新时间</h1>
            <RangePicker
              placeholder={["开始时间", "结束时间"]}
              allowClear={false}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(time, timeString) => {
                console.log('time:', time);
                console.log('timeString:', timeString);
              }}
            />
          </div>
        </div> */}

          // 按归属公司查询
  // const handleChangeCompany = useCallback((value: any) => {
  //   dispatch({
  //     type: SearchActionType.changeCompany,
  //     payload: value,
  //   });
  // }, []);

  // // 按厂站类型查询
  // const handleChangeStationType = useCallback((value: any) => {
  //   dispatch({
  //     type: SearchActionType.changeStationType,
  //     payload: value,
  //   });
  // }, []);

  // // 按厂站电压等级查询
  // const handleChangeVoltageLevel = useCallback((value: any) => {
  //   dispatch({
  //     type: SearchActionType.changeVoltageLevel,
  //     payload: value,
  //   });
  // }, []);

  // // 按底图类型查询
  // const handleChangeBaseImgType = useCallback((value: any) => {
  //   dispatch({
  //     type: SearchActionType.changeBaseImgType,
  //     payload: value,
  //   });
  // }, []);

  // // 按区域电压等级查询
  // const handleChangeBaseImgArea = useCallback((value: any) => {
  //   dispatch({
  //     type: SearchActionType.changeBaseImgArea,
  //     payload: value,
  //   });
  // }, []);

  // // 按更新时间查询
  // const handleChangeTimeRange = useCallback((value: any) => {
  //   dispatch({
  //     type: SearchActionType.changeTimeRange,
  //     payload: value,
  //   });
  // }, []);

  // // 厂站名称模糊查询
  // const handleChangeSearchField = useCallback((value: any) => {
  //   dispatch({
  //     type: SearchActionType.changeSearchField,
  //     payload: value,
  //   });
  // }, []);


// powerOutage:  [],
powerOutage: [
  {
    name: "220kV正母线",
    isCombination: false,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "220kV正母线-220kV副母线",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "新官5K37线",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        },
        {
          name: "2X482刀闸",
          status: "open"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "新官线5031开关",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "新官线/三胜线5032开关",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "三胜5633线",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "三胜线5033开关",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "东殿5646线",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "东殿线5041开关",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "东殿线/三利线5042开关",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "三利5634线",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "三利线5043开关",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
  {
    name: "3号主变5063开关",
    isCombination: true,
    devicesSetting: {
      closeUpSwitches: [
        {
          name: "2X492刀闸",
          status: "open"
        },
        {
          name: "2610开关",
          status: "close"
        },
        {
          name: "2610开关",
          status: "open"
        },
        {
          name: "260134接地刀闸",
          status: "open"
        },
        {
          name: "2X492刀闸",
          status: "close"
        }
      ],
      isNonPowerDevices: ["新安线"]
    }
  },
]
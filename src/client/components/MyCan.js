import React from "react";
import {AuthConsumer} from "../authContext";

const check = (rules, action, data) => {
  let permissions = rules;
  console.info("MyCan:permissions=" + permissions);

  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

const MyCan = props => (
  <AuthConsumer>
    {({user}) => (
        check(user.permissions, props.perform, props.data)
        ? props.yes()
        : props.no()
      )
    }
  </AuthConsumer>
);

MyCan.defaultProps = {
  yes: () => null,
  no: () => null
};

export default MyCan;
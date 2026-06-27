import React from "react";
import {
  SortAscendingOutlined,
  ClockCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";

interface CategoriaFilterProps {
  onFiltroChange: (key: string) => void;
}

const CategoriaFilter: React.FC<CategoriaFilterProps> = ({
  onFiltroChange,
}) => {
  const items: MenuProps["items"] = [
    {
      key: "asc",
      label: "Ordem Alfabética (A-Z)",
      icon: <SortAscendingOutlined />,
    },
    {
      key: "desc",
      label: "Ordem Alfabética (Z-A)",
      icon: <SortAscendingOutlined style={{ transform: "scaleY(-1)" }} />,
    },
    {
      type: "divider",
    },
    {
      key: "recentes",
      label: "Adicionados recentemente",
      icon: <ClockCircleOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    onFiltroChange(e.key);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button
        shape="circle"
        icon={<FilterOutlined />}
        style={{ cursor: "pointer" }}
      />
    </Dropdown>
  );
};

export default CategoriaFilter;

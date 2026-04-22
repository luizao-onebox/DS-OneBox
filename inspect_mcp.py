import sys, json
sys.path.insert(0, r'C:\Users\LuizBaptistella\Desktop\Figma-automation\Figma-automation\Workflow\Agent')
from mcp_client import MCPClient

def inspect():
    client = MCPClient()
    client.start()
    try:
        res = client.call_tool('figma_execute', {
            'code': """
            const extract = (n) => {
                if (!n) return null;
                let fills = [];
                if (n.fills && n.fills.length > 0 && n.fills[0].color) {
                    fills = [n.fills[0].color];
                }
                let children = [];
                if (n.children) {
                    children = n.children.map(c => ({
                        name: c.name, type: c.type, 
                        width: c.width, height: c.height,
                        layoutMode: c.layoutMode,
                        itemSpacing: c.itemSpacing,
                        paddingLeft: c.paddingLeft,
                        paddingTop: c.paddingTop,
                        text: c.characters
                    }));
                }
                return {
                    name: n.name, type: n.type, 
                    width: n.width, height: n.height,
                    layoutMode: n.layoutMode,
                    itemSpacing: n.itemSpacing,
                    paddingLeft: n.paddingLeft,
                    paddingRight: n.paddingRight,
                    paddingTop: n.paddingTop,
                    paddingBottom: n.paddingBottom,
                    fills,
                    children
                };
            };
            const n1 = await figma.getNodeByIdAsync("3814:23196");
            const n2 = await figma.getNodeByIdAsync("3814:23303");
            const n3 = await figma.getNodeByIdAsync("3165:12419");
            return {
                sidebar: extract(n1),
                collapsed: extract(n2),
                expanded: extract(n3)
            };
            """
        })
        print(json.dumps(res, indent=2))
    finally:
        client.stop()

if __name__ == '__main__':
    inspect()
